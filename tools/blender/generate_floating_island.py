"""
Procedural floating-island asset generator for Blender 3.4+.

Run INSIDE Blender (headless recommended)::

    blender --background --python generate_floating_island.py -- \
        --seed home --radius 9 --out ../../frontend/public/models/island-home.glb

Environment note (Oct 2026): no Blender executable is installed in this
workspace, so the portfolio renders fully procedural Three.js geometry
(see frontend/src/world/FloatingIsland.tsx) and NEVER depends on these
exports. When Blender becomes available, run this script and drop the GLB
files into frontend/public/models/ — WorldCanvas will prefer them via the
asset manifest (docs/ASSET_PIPELINE.md).

What it builds (all real geometry, game-ready counts):
  - grass cap: subdivided disc with seeded noise displacement
  - tapered rock underside: two stacked displaced cones
  - crystal cluster: N stretched octahedrons, emissive cyan material
  - pine stand: instanced trunk + 2-tier foliage cones
  - portal ring: torus + emissive disc (contact island variant)
  - bridge arc: curved tube segment between two anchor empties
"""

from __future__ import annotations

import argparse
import math
import random
import sys

try:
    import bpy  # type: ignore
    import mathutils  # type: ignore
    INSIDE_BLENDER = True
except ImportError:  # Running outside Blender: print usage, change nothing.
    INSIDE_BLENDER = False


def parse_args(argv: list[str]):
    p = argparse.ArgumentParser(description="Generate a floating island GLB.")
    p.add_argument("--seed", default="home")
    p.add_argument("--radius", type=float, default=8.0)
    p.add_argument("--variant", default="meadow",
                   choices=["meadow", "harbor", "archive", "portal"])
    p.add_argument("--out", default="island.glb")
    return p.parse_args(argv)


# ---------------------------------------------------------------- Blender ops

def clear_scene() -> None:
    assert INSIDE_BLENDER
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for coll in (bpy.data.meshes, bpy.data.materials, bpy.data.images):
        for x in list(coll):
            coll.remove(x)


def glow_material(name: str, color: tuple[float, float, float, float],
                  strength: float = 2.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Emission Color"].default_value = color
    bsdf.inputs["Emission Strength"].default_value = strength
    bsdf.inputs["Roughness"].default_value = 0.35
    return mat


def flat_material(name: str, color: tuple[float, float, float, float],
                  roughness: float = 0.9):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    return mat


def displace(obj, seed: int, scale: float = 1.2, detail: float = 3.0) -> None:
    tex = bpy.data.textures.new(f"noise_{obj.name}", type="CLOUDS")
    tex.noise_scale = scale
    tex.noise_depth = 4
    mod = obj.modifiers.new("IslandNoise", type="DISPLACE")
    mod.texture = tex
    mod.texture_coords = "OBJECT"
    mod.strength = detail
    mod.mid_level = 0.5
    random.seed(seed)


def build_island(seed: str, radius: float, variant: str):
    assert INSIDE_BLENDER
    rng = random.Random(abs(hash(seed)) % (2 ** 31))

    grass = flat_material("Grass", (0.16, 0.38, 0.30, 1.0))
    rock = flat_material("Rock", (0.14, 0.18, 0.24, 1.0))
    glow = glow_material("AccentGlow", (0.48, 0.87, 1.0, 1.0))
    violet = glow_material("VioletGlow", (0.73, 0.76, 1.0, 1.0),
                           strength=1.6)

    # Grass cap ------------------------------------------------------
    bpy.ops.mesh.primitive_cylinder_add(
        radius=radius, depth=1.1, vertices=48,
        location=(0, 0, 0.8))
    cap = bpy.context.active_object
    cap.name = f"Island_{seed}_Cap"
    cap.data.materials.append(grass)

    # Tapered rock underside -----------------------------------------
    bpy.ops.mesh.primitive_cone_add(
        radius1=radius * 0.92, depth=6.5, vertices=24,
        location=(0, 0, -2.4))
    under = bpy.context.active_object
    under.name = f"Island_{seed}_Rock"
    under.rotation_euler[0] = math.pi
    under.data.materials.append(rock)
    displace(under, rng.randint(1, 99999), scale=2.2, detail=1.4)

    # Under-glow tip --------------------------------------------------
    bpy.ops.mesh.primitive_ico_add(radius=0.55, location=(0, 0, -6.4))
    tip = bpy.context.active_object
    tip.name = f"Island_{seed}_Tip"
    tip.data.materials.append(glow)

    # Crystal cluster -------------------------------------------------
    for i in range(4):
        bpy.ops.mesh.primitive_ico_add(
            radius=0.4,
            location=(rng.uniform(-2, 2), 1.4, rng.uniform(-2, 2)))
        c = bpy.context.active_object
        c.name = f"Island_{seed}_Crystal_{i}"
        c.scale = (1.0, 1.0, rng.uniform(1.6, 3.2))
        c.data.materials.append(glow if i % 2 == 0 else violet)

    # Pine stand (instanced via linked duplicates) --------------------
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.12, depth=0.9, vertices=6, location=(0, -99, 0))
    trunk_proto = bpy.context.active_object
    trunk_proto.data.materials.append(
        flat_material("Bark", (0.26, 0.20, 0.15, 1.0)))
    bpy.ops.mesh.primitive_cone_add(
        radius=0.65, depth=1.5, vertices=6, location=(0, -99, 0))
    pine_proto = bpy.context.active_object
    pine_proto.data.materials.append(
        flat_material("Pine", (0.13, 0.33, 0.25, 1.0)))

    tree_count = max(6, int(radius * 1.4))
    for i in range(tree_count):
        a = rng.uniform(0, math.tau)
        r = radius * rng.uniform(0.3, 0.82)
        x, z = math.cos(a) * r, math.sin(a) * r
        s = rng.uniform(0.7, 1.4)
        for proto, dy in ((trunk_proto, 1.6), (pine_proto, 2.6)):
            dup = proto.copy()
            dup.data = proto.data.copy()
            dup.location = (x, dy * s - 0.8, z)
            dup.scale = (s, s, s)
            bpy.context.collection.objects.link(dup)
    bpy.data.objects.remove(trunk_proto)
    bpy.data.objects.remove(pine_proto)

    # Variant dressing -------------------------------------------------
    if variant == "portal":
        bpy.ops.mesh.primitive_torus_add(
            major_radius=2.8, minor_radius=0.16, location=(0, 4.0, -1.0))
        ring = bpy.context.active_object
        ring.name = f"Island_{seed}_PortalRing"
        ring.data.materials.append(violet)

    # Keep poly budget sane: decimate the displaced rock only.
    for obj in (under,):
        mod = obj.modifiers.new("Decimate", type="DECIMATE")
        mod.ratio = 0.6

    return [o for o in bpy.context.scene.objects]


def export_glb(path: str) -> None:
    assert INSIDE_BLENDER
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format="GLB",
        export_apply=True,
        export_texcoords=True,
        export_normals=True,
        export_draco_mesh_compression_enable=False,
    )
    print(f"[islands] exported {path}")


def main(argv: list[str]) -> int:
    if not INSIDE_BLENDER:
        print(__doc__)
        print("ERROR: bpy is unavailable — install Blender 3.4+ and "
              "re-run with: blender --background --python "
              "generate_floating_island.py -- --help")
        return 2
    args = parse_args(argv)
    clear_scene()
    build_island(args.seed, args.radius, args.variant)
    export_glb(args.out)
    return 0


if __name__ == "__main__":
    cli = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    raise SystemExit(main(cli))

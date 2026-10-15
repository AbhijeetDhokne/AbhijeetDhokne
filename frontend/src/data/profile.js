// DEVSLAYER Phase 1 — central profile content.
// Source of truth: verified strings from frontend/src/App.jsx + Contact.jsx.
// TODOs are marked inline; do not render TODO fields publicly.

export const profile = {
  name: 'Abhijeet Dhokne',
  roles: ['Full Stack Web Developer'],
  tagline: 'Computer Science student building efficient, scalable systems and engaging digital experiences.',
  location: 'RAU, Indore, Madhya Pradesh, India',
  email: 'abhijeetdhokne1474@gmail.com',
  // Owner decision (Phase 2): phone is private — not displayed publicly.
  // Contact via verified email + LinkedIn/GitHub only.
  resumePath: `${import.meta.env.BASE_URL}resume/resume_1.pdf`,
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/Abhijeet83193', verified: true },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/abhijeet-dhokne-8644a32b3/', verified: true },
    { id: 'x', label: 'X', url: 'https://x.com/Abhijeet_Dhokne', verified: true },
    // TODO(owner): "Google" link is a placeholder (https://www.google.com) — replace or remove.
    { id: 'google', label: 'Google', url: 'https://www.google.com', verified: false },
  ],
  codingProfiles: [
    { id: 'leetcode', label: 'LeetCode', username: 'Avdx23e', url: 'https://leetcode.com/u/Avdx23e/', verified: true },
    { id: 'codechef', label: 'CodeChef', username: 'abhi_14avd', url: 'https://www.codechef.com/users/abhi_14avd', verified: true },
    { id: 'codeforces', label: 'Codeforces', username: 'abhi_14avd', url: 'https://codeforces.com/profile/abhi_14avd', verified: true },
  ],
};

export default profile;

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jpydillysjdnwwyxzrkf.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Please set SUPABASE_SERVICE_ROLE_KEY in your environment");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const projectCards = [
  {
    color: "#0a0a0a",
    title: "Ashwatthama",
    description: "Heavyweight combat robot with a high-RPM spinning drum weapon. Built to dominate national arenas.",
    label: "Project Trishakti",
    image: "/images/projects/ashwatthama.jpg",
  },
  {
    color: "#0a0a0a",
    title: "Vajra",
    description: "Middleweight flipper bot designed for explosive launches and rapid self-righting.",
    label: "Project Trishakti",
    image: "/images/projects/vajra.jpg",
  },
  {
    color: "#0a0a0a",
    title: "Garuda",
    description: "Aerial drone platform for reconnaissance and precision payload delivery with autonomous flight planning.",
    label: "Project Trishakti",
    image: "/images/projects/garuda.jpg",
  },
  {
    color: "#0a0a0a",
    title: "Project Y",
    description: "Next-gen autonomous ground vehicle pushing the limits of mechanical and embedded systems design.",
    label: "Classified",
    image: "/images/projects/project_y.jpg",
  },
  {
    color: "#0a0a0a",
    title: "RC Racer",
    description: "All-terrain RC car with custom suspension, ESC tuning, and lightweight carbon-fibre chassis.",
    label: "RC Division",
    image: "/images/projects/rc_racer.jpg",
  },
  {
    color: "#0a0a0a",
    title: "Fixed-Wing",
    description: "Handbuilt fixed-wing RC aircraft with optimised airfoil design and long-range flight control.",
    label: "Aeromodelling",
    image: "/images/projects/fixed_wing.jpg",
  },
];

async function setup() {
  console.log('Seeding Supabase Database...');

  const { data, error } = await supabase.from('projects').insert(projectCards);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Successfully seeded database!');
  }
}

setup();

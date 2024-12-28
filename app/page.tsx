import Link from 'next/link';

export default function Home() {
  return (
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/course/course_description">Course</Link></li>
          {/* Add other links here */}
        </ul>
      </nav>
  );
}

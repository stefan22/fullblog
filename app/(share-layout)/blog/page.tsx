'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function BlogPage() {
  const tasks = useQuery(api.tasks.get);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl">Blog</h1>
      </div>
      <div className="flex-2 w-full">
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </div>
    </main>
  );
}

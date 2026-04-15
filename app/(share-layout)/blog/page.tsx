import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'CakeStack Blog',
  description: 'We love cake and web development',
  category: 'web development',
  authors: [{ name: 'Admin@CakeStack' }],
};

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Blog Posts
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Frontend development insights
        </p>
      </div>

      <Suspense fallback={'Loading...'}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

const LoadBlogList = async () => {
  const data = await fetchQuery(api.posts.getPosts);

  return (
    <div className="grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card key={post._id}>
          <CardTitle>
            <h1 className="text-2xl font-bold hover:text-primary px-4">
              <Link href={`/blog/${post._id}`}>{post.title}</Link>
            </h1>
          </CardTitle>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">{post.body}</p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({
                className: 'w-full',
                size: 'lg',
              })}
              href={`/blog/${post._id}`}>
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

'use client';

import { buttonVariants } from '@/components/ui';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useConvexAuth, useQuery } from 'convex/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function PostAuthorActions({ postId }: { postId: Id<'posts'> }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const post = useQuery(api.posts.getPostById, { postId });
  const userId = useQuery(api.presence.getUserId);

  if (isLoading || !isAuthenticated || !post || !userId) {
    return null;
  }

  if (post.authorId !== userId) {
    return null;
  }

  return (
    <Link
      href={`/blog/${postId}/edit`}
      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
      Edit post
    </Link>
  );
}

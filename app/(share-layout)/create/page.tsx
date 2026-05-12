import { PostEditor } from '@/components/web/PostEditor';
import { createBlogAction } from '@/app/actions';

export default function CreateRoute() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Sharing is Caring. Let&apos;s write a new post!
        </p>
      </div>

      <PostEditor mode="create" onSubmit={createBlogAction} />
    </div>
  );
}

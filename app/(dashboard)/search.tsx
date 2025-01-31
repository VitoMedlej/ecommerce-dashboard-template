'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/icons';
import { Search } from 'lucide-react';

export function SearchInput() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function searchAction(formData: FormData) {

    const value = formData.get('q') as string;

    if (!value) {
      console.error('Search query is empty.');
      return;
    }

    try {
      startTransition(() => {
        router.replace(`/?q=${encodeURIComponent(value)}`);
      });
    } catch (error) {
      console.error('Error during search:', error);
    }
  }
  const clearSearch = () => {
    startTransition(() => {
      router.replace(`/?q `);
    });
  }
  return (
    <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-[.35rem]  text-muted-foreground"
      >
        Search
      </button>
      {isPending && <Spinner />}
      <button
       onClick={clearSearch}
        className="text-red-500   text-muted-foreground"
      >
        Clear
      </button>
    </form>
  );
}

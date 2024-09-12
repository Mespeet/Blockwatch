import Vaults from '@/components/vaults/vaults'

export default function Home() {
  return (
    <main className="w-full grid grid-cols-3 xl:grid-cols-5 gap-4 px-4 py-4">
      <Vaults />
    </main>
  );
}

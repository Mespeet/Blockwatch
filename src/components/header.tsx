import Image from 'next/image';
import Link from 'next/link'

export default function Header() {
    return (
        <header className="w-full h-[50px] flex items-center gap-8">
            <Link href="/"><Image src="/images/logo.png" alt="Logo" width={1024} height={150} className="h-[25px] w-auto"/></Link>
            <div className="flex gap-4 items-center">
                <Link href="/general">General</Link>
                <Link href="/vaults">Vaults</Link>
                <Link href="/machines">Machines</Link>
            </div>
        </header>
    );
  }
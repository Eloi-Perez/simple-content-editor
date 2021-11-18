import Link from 'next/link'

export default function Navbar() {
    return (
        <div className="navbar">
            <Link href="/">
                <a><button>
                    <h2>Home</h2>
                </button></a>
            </Link>
            <Link href="/about">
                <a><button>
                    <h2>About</h2>
                </button></a>
            </Link>
        </div>
    )
}
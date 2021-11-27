import Image from 'next/image'

export default function ImageN({ data, className = '' }) {
    return (
        <>
            <Image
                className={className}
                // loader={() => data.file.url} //for img from external src
                src={data.file.url}
                alt={data.caption}
                // layout='fill'
                width={data.file.width}
                height={data.file.height}
                blurDataURL={data.file.url}
                placeholder='blur' // Optional blur-up while loading
            />
        </>
    )
}
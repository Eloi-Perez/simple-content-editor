import Image from 'next/image'

export default function ImageN({ data, className = "" }) {

    return (
        <>
            <Image
                className={className}
                loader={() => data.file.url}
                src={data.file.url}
                alt={data.caption}
                // layout='fill'
                // I need size in data...
                width={150} //automatically provided
                height={150} //automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
            />
            <p>{JSON.stringify(data.file.url)}</p>


            {/* // if imported in code
            <p>{JSON.stringify(data.file.url[Object.keys(data.file.url)[0]].src)}</p>
            <Image
                className={className}
                src={data.file.url[Object.keys(data.file.url)[0]].src}
                alt={data.caption}
                layout='fill'
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
            /> */}
        </>
    )
}
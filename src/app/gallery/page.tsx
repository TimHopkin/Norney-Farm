import Section from "@/components/Section";
import Image from "next/image";

const images = [
    { src: "/gallery/IMG_1448.jpg", alt: "Farm Landscape" },
    { src: "/gallery/IMG_3494.jpg", alt: "Farm Scene" },
    { src: "/gallery/strip-grass.jpg", alt: "Strip Grass by Step Cottage" },
    { src: "/gallery/pigs.jpg", alt: "Pigs" },
    { src: "/gallery/jersey-cow.jpg", alt: "Jersey Cow" },
    { src: "/gallery/boy-and-jersey.jpg", alt: "Boy and Jersey Cow" },
    { src: "/gallery/cow-mooing.jpg", alt: "Cow Mooing" },
    { src: "/gallery/dad-and-charlie.jpg", alt: "Dad and Charlie Sowing" },
];

export default function GalleryPage() {
    return (
        <>
            <Section background="dark" className="py-20">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-text-light)' }}>Gallery</h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                        Glimpses of life at Norney Farm.
                    </p>
                </div>
            </Section>

            <Section>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {images.map((img, index) => (
                            <div key={index} style={{
                                position: 'relative',
                                height: '300px',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                    className="hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
}

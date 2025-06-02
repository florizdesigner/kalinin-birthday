import { useEffect, useRef, useState } from 'react';
// import explosionSoundSrc from '../assets/explosion.mp3';
import imageSrc from '../assets/fila.png';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { motion } from 'framer-motion';

export default function ExplodingImage({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [showSmoke, setShowSmoke] = useState(false);
    const [startExplosion, setStartExplosion] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const image = new Image();
        image.src = imageSrc;

        image.onload = () => {
            const scaleFactor = Math.min(
                canvas.width * 0.5 / image.width,
                canvas.height * 0.5 / image.height
            );
            const scaledWidth = image.width * scaleFactor;
            const scaledHeight = image.height * scaleFactor;
            const imgX = (canvas.width - scaledWidth) / 2;
            const imgY = (canvas.height - scaledHeight) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, imgX, imgY, scaledWidth, scaledHeight);
        };

        // Запуск взрыва через 1 секунду
        const delayTimer = setTimeout(() => {
            setStartExplosion(true);
            setShowSmoke(true);
        }, 1000);

        return () => clearTimeout(delayTimer);
    }, []);

    useEffect(() => {
        if (!startExplosion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = imageSrc;

        const fragmentSize = window.innerWidth < 500 ? 8 : 16;
        let particles: any[] = [];

        image.onload = () => {
            const scaleFactor = Math.min(
                canvas.width * 0.5 / image.width,
                canvas.height * 0.5 / image.height
            );
            const scaledWidth = image.width * scaleFactor;
            const scaledHeight = image.height * scaleFactor;

            const imgX = (canvas.width - scaledWidth) / 2;
            const imgY = (canvas.height - scaledHeight) / 2;

            for (let y = 0; y < scaledHeight; y += fragmentSize) {
                for (let x = 0; x < scaledWidth; x += fragmentSize) {
                    const fragmentCanvas = document.createElement('canvas');
                    fragmentCanvas.width = fragmentSize;
                    fragmentCanvas.height = fragmentSize;
                    const fragmentCtx = fragmentCanvas.getContext('2d');
                    if (!fragmentCtx) continue;

                    fragmentCtx.drawImage(
                        image,
                        (x / scaledWidth) * image.width,
                        (y / scaledHeight) * image.height,
                        (fragmentSize / scaledWidth) * image.width,
                        (fragmentSize / scaledHeight) * image.height,
                        0,
                        0,
                        fragmentSize,
                        fragmentSize
                    );

                    particles.push({
                        x: imgX + x,
                        y: imgY + y,
                        vx: (Math.random() - 0.5) * 12,
                        vy: (Math.random() - 0.5) * 12,
                        canvas: fragmentCanvas,
                        alpha: 1,
                    });
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            audioRef.current?.play();
            animate();
        };

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.4;
                p.alpha -= 0.015;

                if (p.alpha > 0) {
                    ctx.globalAlpha = p.alpha;
                    ctx.drawImage(p.canvas, p.x, p.y);
                }
            });
            ctx.globalAlpha = 1;
            particles = particles.filter((p) => p.alpha > 0);

            if (particles.length > 0) {
                requestAnimationFrame(animate);
            } else {
                onComplete();
            }
        }
    }, [startExplosion, onComplete]);

    // @ts-ignore
    return (
        <>
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-30 pointer-events-none" />

            {/* Дым */}
            {showSmoke && (
                <motion.div
                    className="absolute inset-0 z-40 pointer-events-none w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Particles
                        id="tsparticles-smoke"
                        init={loadSlim}
                        options={{
                            fullScreen: { enable: false },
                            particles: {
                                number: { value: 60 },
                                color: { value: '#aaaaaa' },
                                opacity: { value: 0.4, random: true },
                                size: { value: { min: 10, max: 20 }, random: true },
                                move: {
                                    enable: true,
                                    direction: 'top',
                                    speed: 0.3,
                                    outModes: { default: 'destroy' },
                                },
                                life: {
                                    duration: { sync: false, value: 4 },
                                    count: 1,
                                },
                            },
                            detectRetina: true,
                        }}
                    />
                </motion.div>
            )}

            {/* Вибрация */}
            {startExplosion && (
                <motion.div
                    className="fixed inset-0 z-50 pointer-events-none"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                        x: [0, -5, 5, -3, 3, 0],
                        y: [0, 5, -5, 3, -3, 0],
                    }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </>
    );
}
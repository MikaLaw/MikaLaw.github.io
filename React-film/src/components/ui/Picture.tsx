import defaultBg from '@/assets/bg-header.jpg';
import { getImageUrl } from '@/utils';
import React from 'react';

interface PictureProps {
    bg?: string | null;
    name?: string;
}

export const Picture: React.FC<PictureProps> = ({ bg, name = 'Фильм' }) => {
    if (!bg) {
        return <img src={defaultBg} alt="По умолчанию" />;
    }

    return (
        <picture>
            <source srcSet={getImageUrl(bg, 'webp')} type="image/webp" />
            <img src={getImageUrl(bg, 'jpg')} alt={name} width="250px" height="250px" />
        </picture>
    );
};
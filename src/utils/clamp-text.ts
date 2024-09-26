

export const clampText = (lineCount: number, lineHeight: number) => {
    const maxHeight = lineHeight * lineCount;

    return {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineCount,
        textOverflow: 'ellipsis',
        maxHeight: `${maxHeight}px`
    };
};
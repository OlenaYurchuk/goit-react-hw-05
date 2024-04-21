import css from '../Text/Text.module.css'

export default function Text({ children, textAlign = '', marginBottom = '0' }) {
    return (
        <p
            className={[
                css['text'],
                css[textAlign],
                css[`marginBottom${marginBottom}`],
            ].join(' ')}
        >
            {children}
        </p>
    );
}
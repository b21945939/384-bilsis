import { Icon } from '@iconify/react';
// @mui

export default function Iconify({ icon, style, ...other }) {
    if (icon?.startsWith('http')) return <img alt="logo" style={style} src={icon} />;

    return <Icon icon={icon} style={style} {...other} />;
}

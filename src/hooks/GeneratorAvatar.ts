import _1 from '../assets/avatars/1.png';
import _2 from '../assets/avatars/2.png';
import _3 from '../assets/avatars/3.png';
import _4 from '../assets/avatars/4.png';
import _5 from '../assets/avatars/5.png';
import _6 from '../assets/avatars/6.png';
import _7 from '../assets/avatars/7.png';
import _8 from '../assets/avatars/8.png';
import _9 from '../assets/avatars/9.png';
import _10 from '../assets/avatars/10.png';
import _11 from '../assets/avatars/11.png';
import avatar from '../assets/avatars/defaultAvatar.png';


export const AvatarArr = [
    {url: avatar, id: 0},
    {url: _1, id: 1},
    {url: _2, id: 2},
    {url: _3, id: 3},
    {url: _4, id: 4},
    {url: _5, id: 5},
    {url: _6, id: 6},
    {url: _7, id: 7},
    {url: _8, id: 8},
    {url: _9, id: 9},
    {url: _10, id: 10},
    {url: _11, id: 11},
]


export const findAvatar = (id: number) => {
    return AvatarArr[id].url
}

export const defaultAvatar = () => avatar;
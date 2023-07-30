import {proxy} from 'valtio';

const state = proxy ({
intro:true,
color:'#AD1457',   /*  #EFBD48 */
isLogoTexture:true,
isFullTexture:false,
logoDecal: './logo.png',
fullDecal: './logo.png',
});

export default state;
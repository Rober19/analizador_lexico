export default {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'reservada', foreground: 'ff00e6' },
    { token: 'declarators', foreground: '00f7ff' },
    { token: 'string', foreground: '038cfc' },
    { token: 'operator', foreground: '038cfc' },
    { token: 'variable', foreground: '038cfc' },
    {
      token: 'comment',
      foreground: '61728f',
      fontStyle: '',
    },
  ],
};
/** base 用于渲染的初始主题。目前开箱即用的主题是：'vs'（默认），'vs-dark'，'hc-black'。*/

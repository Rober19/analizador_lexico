interface IDrawerItem {
  to?: string,
  icon: string,
  text: string,
  type_selection: 'item' | 'group',
  function?: Function,
  subitems?: any,
  expanded: boolean
}
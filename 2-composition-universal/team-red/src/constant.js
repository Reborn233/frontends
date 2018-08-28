// data
export const ALL = 'all';
export const DOING = 'doing';
export const FINISHED = 'finished';
export const note = {
  name: 'Reborn',
  notes: [{
      id: 1,
      content: 'Vue js',
      finished: false
    },
    {
      id: 2,
      content: 'React js',
      finished: true
    },
    {
      id: 3,
      content: 'Angular js',
      finished: false
    },
  ],
};
export const tabs = [{
    label: '全部',
    value: ALL
  },
  {
    label: '进行中',
    value: DOING
  },
  {
    label: '已完成',
    value: FINISHED
  }
];

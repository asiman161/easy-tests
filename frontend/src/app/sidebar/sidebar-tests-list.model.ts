export interface SidebarTestsList {
  tests: [{
    expanded: boolean;
    caption?: string;
    tests: [{
      name: string,
      expanded?: boolean;
      data?: {
        examName?: string,
        rate?: number,
        completed?: boolean,
        expanded?: boolean,
        students?: [{
          name: string,
          rate?: number
        }]
      }
    }];
  }]
}
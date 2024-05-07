// May need to increase these guys
// The response is way bigger than this

export interface Organization {
  id: number;
  login: string;
}

export interface Repository {
  id: number;
  name: string;
}

export interface Branch {
  name: string;
}

export interface RepositoryConfigs {
  name: string;
  framework: string;
}

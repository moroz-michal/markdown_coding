export interface Snippet {
  lang: string;
  label: string;
  code: string;
}

export interface Slide {
  slug: string;
  title: string;
  step: number;
  chapter: string;
  description: string;
  content: string;
  goals: string[];
  snippets: Snippet[];
}

export interface Chapter {
  title: string;
  slides: Slide[];
}

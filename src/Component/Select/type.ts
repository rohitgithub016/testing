export interface Option {
  label: string;
  value: string;
  totalSubscribers?: number;
}

export interface OptionsProp {
  options: Option[];
  handleSelectedOption: (option: Option) => void;
  handleClose: () => void
}

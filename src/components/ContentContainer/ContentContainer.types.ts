export type ContentContainerPropsType = {
  /**
   * Border color of the section container
   */
  borderColor?: 'primary' | 'secondary' | 'dark';
  /**
   * Border color of the section container
   */
  customBorderColor?: string;
  /**
   * Border width of the section container
   */
  customBorderWidth?: number;
  /**
   * Section Title for container
   */
  title?: string | JSX.Element;
  /**
   * Section content for container
   */
  content: JSX.Element;
  /**
   * minHeight for container
   */
  minHeightContent?: string;
  /**
   * maxHeight for container
   */
  maxHeightContent?: string;

  /**
   * custom containerClass
   */
  containerClass?: string;
  /**
   * custom titleClass
   */
  titleClass?: string;
  /**
   * custom contentClass
   */
  contentClass?: string;
};

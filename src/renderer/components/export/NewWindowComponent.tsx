import React, { Component } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  onClose: () => void;
  windowName: string;
}

export default class NewWindowComponent extends Component<Props> {
  // Create a container <div> for the window
  private containerEl = document.createElement('div');

  // This will keep a reference of the window
  private externalWindow: Window | null = null;

  // When the component mounts, Open a new window
  componentDidMount() {
    // The second argument in window.open is optional and can be set to whichever
    // value you want. You will notice the use of this value when we modify the main
    // electron.js file
    this.externalWindow = window.open('', this.props.windowName);

    // Append the container div and register the event that will get fired when the
    // window is closed
    if (this.externalWindow) {
      console.log('external window:', this.externalWindow)
      console.log('externalWindow.document:', this.externalWindow.document)
      // console.log('externalWindow.document.body:', this.externalWindow.document.body)
      const blah = this.externalWindow;

      this.externalWindow.onload = () => {
        blah.document.body.appendChild(this.containerEl);
        blah.onunload = () => {
          console.log('trying to close...');
          this.props.onClose();
        }
      }
      // this.externalWindow.document.body.appendChild(this.containerEl);

    }
  }

  render() {
    return createPortal(this.props.children, this.containerEl);
  }
}

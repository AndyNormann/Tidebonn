import {Text, View} from 'react-native';
import {parseDocument, ElementType} from 'htmlparser2-without-node-native';
import React, {PureComponent} from 'react';

export default class RenderHtml extends PureComponent {
  ignoredTags = ['head'];
  textTags = ['p', 'span', 'strong', 'em'];

  renderTextNode(textNode, index) {
    return <Text key={index}>{textNode.data}</Text>;
  }

  renderElement(element, index) {
    if (this.ignoredTags.indexOf(element.name) > -1) {
      return null;
    }
    const Wrapper = this.textTags.indexOf(element.name) > -1 ? Text : View;
    return (
      <Wrapper key={index}>
        {element.children.map((c, i) => this.renderNode(c, i))}
      </Wrapper>
    );
  }

  renderNode(node, index) {
    switch (node.type) {
      case ElementType.Text:
        return this.renderTextNode(node, index);
      case ElementType.Tag:
        return this.renderElement(node, index);
    }
    return null;
  }

  render() {
    const document = parseDocument(this.props.html);
    return document.children.map((c, i) => this.renderNode(c, i));
  }
}

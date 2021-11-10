import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import ReactDOM from "react-dom";

import React, { Component } from "react";
import { Tree } from "primereact/tree";
import { NodeService } from "../service/NodeService";

export class TreeDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: null,
      expandedKeys: {}
    };

    this.nodeService = new NodeService();
    this.expandNode = this.expandNode.bind(this);
  }

  expandNode(node, expandedKeys) {
    if (node.children && node.children.length) {
      expandedKeys[node.key] = true;

      for (let child of node.children) {
        this.expandNode(child, expandedKeys);
      }
    }
  }

  componentDidMount() {
    this.nodeService
      .getTreeNodes()
      .then((data) => this.setState({ nodes: data }));
  }

  render() {
    return (
      <div>
        <div className="card">
          <h5>Basic</h5>
          <Tree value={this.state.nodes} />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TreeDemo />, rootElement);

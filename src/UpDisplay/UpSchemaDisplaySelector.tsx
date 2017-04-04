﻿import * as React from "react";
import * as ReactDOM from "react-dom";
import UpDisplayDate from "./UpDisplayDate";
import UpSchemaDisplayArray from "./UpSchemaDisplayArray";

export default class UpSchemaDisplaySelector extends React.Component<{
    schema: JsonSchema;
    data: any;
}, {}> {


        if (this.props.schema.hide === true) {
            return <span />
        }

        var type = function (t) {
            if (typeof (t) === "string") {
                return t;
            } else if (t.indexOf("null") != -1) {
                return t[0];
            }
        }(this.props.schema.type);


        switch (this.props.schema.format) {
            case "multilineText":
                return <span style={{ "whiteSpace": "pre" }}>{this.props.data}</span>
            case "imageUrl":
                return <img src={this.props.data} alt="test" ></img>
            case "uri":
                return <a target="_top" href={this.props.data}>{this.props.schema.description}</a>
            case "phone":
                if (this.props.data == null || this.props.data.length < 10) {
                    return <span >{this.props.data}</span>;
                }

                var phone = this.props.data.replace(/[^0-9|+]/g, "");
                var phoneSplit = phone[0] !== "+" ? phone.match(/.{1,2}/g) : phone.match(/(\+33.)|.{1,2}/g);
                var cleanPhone = phoneSplit.join(" ");
                return <span >{cleanPhone}</span>

            case "date":
                return <UpDisplayDate date={this.props.data} format={this.props.schema.format} />
            case "date-time":
                return <UpDisplayDate date={this.props.data} format={this.props.schema.format} />
            case "time":
                if (this.props.data != null && this.props.data.length == 5) {
                    return <span>{this.props.data}</span>
                }
                return <UpDisplayDate date={this.props.data} format={this.props.schema.format} />
            case "entityKey":
            case "enum":
        }

        switch (type) {
            case "object":
                return <UpObject schema={this.props.schema} data={this.props.data} />
            //return <span>Type object: {JSON.stringify(this.props.data) } </span>
            case "string":
                return <span style={{ whiteSpace: "pre" }}>{this.props.data}</span>
            case "number":
                return <span>{this.props.data}</span>
            case "integer":
                return <span>{this.props.data}</span>;
            case "boolean":
                return <span>{this.props.data == null ? "" : this.props.data == true ? "Oui" : "Non"}</span>;
            case "array":
                return <UpSchemaDisplayArray ref={(arg) => { this.UpSchemaDisplayArrayRef = arg; }} /*exporterBtn={this.props.exporterBtn}*//* autoExport={this.props.autoExport}*/ data={this.props.data} schema={this.props.schema} />
        }
    }
}

class UpObject extends React.Component<{
    schema: JsonSchema;
    data: any;
}, {}> {


        var elements = [];
        var properties = [];
        var propertiesName = [];

            if (this.props.schema.properties.hasOwnProperty(index)) {
                var schema = this.props.schema.properties[index];
                elements.push(
                    <div key={index} className={"col-md-6"}>
                        <div className={"col-md-6"}>
                            <strong >{schema.title}: </strong>
                        </div>
                        <div className={"col-md-6"}>
                            <UpSchemaDisplaySelector data={this.props.data[index]} schema={schema} />
                    </div>
                )
            }
        }

        return <div className="panel panel-default">
            <div className="panel-heading">
                {this.props.schema.title}
            </div>
            <div className="panel-body">
                {elements}

            </div>
        </div>
    }
}

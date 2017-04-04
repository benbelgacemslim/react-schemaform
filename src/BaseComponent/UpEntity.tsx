﻿import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
//import UpSelect2 from "../externalReactComponent/UpSelect2"
import UpSelect2 from "../../node_modules/up-react-control/Controls/UpSelect2"

interface UpEntityExtendProp {
    getFullData: boolean;
    multiple: boolean;
    placeholder?: string;
    allowClear?: boolean;
    minimumInputLength?: number;

    dataSource: {
        id: string,
        text: string,
        query: string,
        queryParameterName: string
    }
}


export default class UpEntity<Type> extends UpFormControl<Type> {
    constructor(p, c) {
    }
    }
        return <UpSelect2
            ref={(input) => { this.UpSelect = input; } }
            default={null}
            isNuallble={this.isNuallble}
            isRequired={this.props.isRequired}
            getFullData={false}
            multiple={this.isArray}
            placeholder="Recherche"
            allowClear={!this.props.isRequired}
            onChange={this.handleChangeJsEventGlobal}
            onError={this.props.onError}
            dataSource= {this.schema.entitySource}
            />

    }

        return args;
    }

    isEmpty(value) {
        if (this.isArray && value != null && value.length === 0) {
            return true;
        }
        return value === null || value === undefined || value === "" || value === "00000000-0000-0000-0000-000000000000";
    }
    private get schema(): JsonSchema {
        return this.props.schema.items || this.props.schema

    }

    private get isArray() {
        return this.props.schema.type.indexOf("array") !== -1;
    }


}


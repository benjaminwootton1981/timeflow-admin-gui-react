import React from "react";


const Step = (props) => {
    const {item} = props;
    console.log('item',item)
    return (
        <table className="new-item__step" id="steps-table">
            <tbody>
            <tr>
                <th>Step Name</th>
                <th>Step Type</th>
                <th>Actions</th>
            </tr>
            <tr>
                <td>
                    <input
                        name="name_new_0"
                        value="Inbound Event"
                        className="required"
                    />
                </td>
                <td>
                    <div className="styled-select">
                        <select
                            name="steptype_new_0"
                            className="step"
                            data-step_id="new_0"
                            onChange="stepTypeChanged(this)"
                        >
                            <option value="{{ step_type }}">
                                Inbound Event - Stream
                            </option>
                        </select>
                    </div>
                    <div className="add-selects" data-step_id="new_0">
                        <div className="styled-select">
                            <select
                                name="{{ item.name }}_new_0"
                                className="form-control step"
                                data-step_id="new_0"
                                data-popover-body="{{ item.popover.bottom_text }}"
                                data-popover-title="{{ item.popover.top_text }}"
                            >
                                <option value="0">Please Select...</option>
                                <option value="{{ topic.name }}">
                                    topic.display_name
                                </option>
                                {/* <option value="{{ option.0 }}">{{ option.1 }}</option> */}
                            </select>
                        </div>
                    </div>
                </td>
                <td>
                    <input
                        type="hidden"
                        name="ordering_new_0"
                        value="1"
                        className="ordering_new"
                    />
                    {
                        !props.isInbound &&
                        <button onClick={() => alert('delete')} className="card-btn card-btn--delete js-delete">
                            Delete
                        </button>
                    }
                </td>
            </tr>
            </tbody>
        </table>
    )
};
export default Step

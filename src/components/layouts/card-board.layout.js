import React, { useState, useEffect } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "react-beautiful-dnd";
import invariant from 'tiny-invariant';
import {GroupCard, SimulationValueCard, StreamValueCard, StreamProcessorValueCard} from "../index";
import DragItem from "../drag-and-drop/DragItem";

export default function CardBoardLayout(props) {
    const [items, setItems] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [draggingRowId, setDraggingRowId] = useState(null);
    const [reorderEnabled, setReorderEnabled] = useState(false);
    const [isCombine, setIsCombine] = useState(true);

    useEffect(() => {
        setItems(props.items);
    }, [props.items]);

    const getHomeColumn = (entities, rowId) => {
        const columnId = entities.columnOrder.find(id => {
            const column = entities.columns[id];
            return column.taskIds.includes(rowId);
        });

        invariant(columnId, 'Count not find row for table');

        return entities.columns[columnId];
    };

    const multiSelect = (
        entities,
        selectedRowIds,
        newRowId,
    ) => {
        // Nothing already selected
        if (!selectedRowIds.length) {
            return [newRowId];
        }

        const columnOfNew = getHomeColumn(entities, newRowId);
        const indexOfNew = columnOfNew.rowIds.indexOf(newRowId);
        const lastSelected = selectedRowIds[selectedRowIds.length - 1];
        const columnOfLast = getHomeColumn(entities, lastSelected);
        const indexOfLast = columnOfLast.rowIds.indexOf(lastSelected);

        // multi selecting to another column
        // select everything up to the index of the current item
        if (columnOfNew !== columnOfLast) {
            return columnOfNew.rowIds.slice(0, indexOfNew + 1);
        }

        // multi selecting in the same column
        // need to select everything between the last index and the current index inclusive

        // nothing to do here
        if (indexOfNew === indexOfLast) {
            return null;
        }

        const isSelectingForwards = indexOfNew > indexOfLast;
        const start = isSelectingForwards ? indexOfLast : indexOfNew;
        const end = isSelectingForwards ? indexOfNew : indexOfLast;

        const inBetween = columnOfNew.rowIds.slice(start, end + 1);

        // everything inbetween needs to have it's selection toggled.
        // with the exception of the start and end values which will always be selected

        const toAdd = inBetween.filter(
            (taskId) => {
                // if already selected: then no need to select it again
                if (selectedRowIds.includes(taskId)) {
                    return false;
                }
                return true;
            },
        );

        const sorted = isSelectingForwards ? toAdd : [...toAdd].reverse();
        const combined = [...selectedRowIds, ...sorted];

        return combined;
    };

    const onDragStart = start => {
        const id = start.draggableId;

        if (id.indexOf('group-') > -1)
            setIsCombine(false);
        else
            setIsCombine(true);

        const selected = selectedRowIds.find(selectedId => selectedId === id)

        if (!selected) {
            unselectedAll();
        }

        setDraggingRowId(start.draggableId);
    };

    const onDragEnd = result => {
      const { destination, source, reason, combine } = result;

        if (combine) {
            const { draggableId } = combine;
            // push selected item to child of destinated group item
            const group_item = items[draggableId.split('group-')[1]];
            const merged_item = items[source.index];
            group_item.childs.push(merged_item)

            const entities = Object.assign([], items);
            entities.splice(source.index, 1);
            console.log(entities)
            setItems(entities)
            return;
        }

        if (!destination || reason === 'CANCEL') {
            setDraggingRowId(null);
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }


        if (source.droppableId.indexOf('group-drop-') > -1) {
            const group = items[source.droppableId.split('group-')[1]];
        } else {


            const entities = Object.assign([], items);
            const quote = items[source.index];
            entities.splice(source.index, 1);
            entities.splice(destination.index, 0, quote);
            setItems(entities)
        }
    };

    const onDragUpdate = result => {
        console.log(result);
        // if non-group card is going to combine with non-group card, disable combine
        const { combine } = result;
        if (combine) {
            if ((result.draggableId.indexOf('group-') === -1) && combine.draggableId.indexOf('group-') === -1) {
                setIsCombine(false);
            }
        }

        // if (result.destination && result.source.index === result.destination.index) {
        //     setIsCombine(true);
        // }
    };

    const unselect = () => {
        unselectedAll();
    };

    const unselectedAll = () => {
        setSelectedRowIds([]);
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        background: isDragging && ("lightblue"),
        ...draggableStyle,
    });

    const reOrder = () => {
        setReorderEnabled(!reorderEnabled);
    };

    const multiSelectTo = newRowId => {
        const updated = multiSelect(
            items,
            selectedRowIds,
            newRowId,
        );

        if (updated == null) {
            return;
        }

        setSelectedRowIds(updated);
    };

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragUpdate={onDragUpdate}
        >
            <Droppable droppableId={props.id}
                       type="COLUMN"
                       direction="horizontal"
                       ignoreContainerClipping={true}
                       isCombineEnabled={isCombine}>
                {
                    (provided, snapshot) => (
                        <div className="card_board_container"
                             ref={provided.innerRef}
                             {...provided.droppableProps}>
                            {
                                items.map((item, index) => {
                                    if (item.type === "group") {
                                        return (
                                            <GroupCard item={item} index={index} />
                                        )
                                    } else
                                        return (
                                            <DragItem item={item} index={index} />
                                        )
                                })
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </DragDropContext>
    )
}

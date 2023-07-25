import * as React from 'react';
import { Droppable, Draggable, DragDropContext, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { useStrictDroppable } from '../hooks/useStrictMode';
interface IAppProps {
    children: React.ReactNode
}

export interface innerElements {
    index: string;
    targetElement: React.ReactNode;
}

const DragAndDrop: React.FunctionComponent<IAppProps> = ({ children }) => {
    const [innerElements, setInnerElements] = React.useState<innerElements[]>([]);
    const [enabled] = useStrictDroppable(false);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return false;
        }
        const items = Array.from(innerElements);
        const [ modifiedElement ] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, modifiedElement);
        return setInnerElements(items);
    };

    React.useEffect(() => {
        setInnerElements(
            React.Children.toArray(children)
                .filter(React.isValidElement)
                .map((child: React.ReactElement, index: number) => ({
                    index: `element-${index}`,
                    targetElement: child
                }))
        );
        return () => {}
    }, [children]);

    return <DragDropContext onDragEnd={onDragEnd}>
            {enabled && 
                <Droppable droppableId="droppable">
                    {(provided: DroppableProvided) => (
                        <div className='dragndrop' {...provided.droppableProps} ref={provided.innerRef}>
                            {innerElements.map((child, index) => (
                                <Draggable key={child.index} draggableId={child.index} index={index}>
                                    {(provided: DraggableProvided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {child.targetElement}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            }
        </DragDropContext>
}

export default DragAndDrop;
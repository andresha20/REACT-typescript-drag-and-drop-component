import * as React from 'react';

interface IAppProps {
    title?: string,
    description?: string,
    date?: Date
}

const Task: React.FunctionComponent<IAppProps> = ({ title, description, date }) => <article className='task-container'>
    <h3>{title}</h3>
    <p>{description}</p>
    <span>{date?.toString()}</span>
</article>

Task.defaultProps = {
    title: 'No title',
    description: 'No description',
    date: new Date(),
}

export default Task;
import { Task } from '../GanttChart/GanttChart';
import './TaskCard.scss';

const VideoConference = new URL('../../assets/VideoConference.svg', import.meta.url).href;
const Banner1 = new URL('../../assets/banner1.png', import.meta.url).href;

export const TaskCard = (props: { task: Task }) => {
  const { task } = props;

  const { duration } = task;
  return (
    <div className="task-card">
      <div className="banner-image">
        <div className="image">
          <img
            src={Banner1}
            alt="banner-image-1"
            width="100%"
            height="100%"
          />
          <div className="sprint-count">Sprint {task.id}</div>
          <div className="title-card">
            <div
              className="title-icon"
              style={{
                backgroundColor:
                  task.backgroundColor === '#ffffff' ||
                  task.backgroundColor === 'white'
                    ? '#000000'
                    : task.backgroundColor
              }}
            >
              <img
                src={VideoConference}
                alt="video-conference"
              />
            </div>
            <div className="title-content">
              <div className="title-header">{task.content}</div>
              <div className="title-subheader">{duration} Days</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <p>
          In our UX kickoff meeting, we align project goals and expectations
          with all stakeholders, ensuring a shared understanding of the product
          vision
        </p>
        <ul>
          <li>Align on project goals and user needs.</li>
          <li>Review existing research and key success metrics.</li>
          <li>Discuss technical constraints and opportunities.</li>
          <li>Outline design process, timeline, and roles.</li>
          <li>Set next steps and deliverables.</li>
        </ul>
      </div>
    </div>
  );
};

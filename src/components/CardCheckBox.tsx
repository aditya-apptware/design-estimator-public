import { CardDetails } from '../utils/constants';

const SelectedSVG = new URL('../assets/Selected.svg', import.meta.url).href;
const Branding = new URL('../assets/project/branding.svg', import.meta.url).href;
const MobileApp = new URL('../assets/project/mobile-app.svg', import.meta.url).href;
const UXAudit = new URL('../assets/project/ux-audit.svg', import.meta.url).href;
const WebApp = new URL('../assets/project/web-app.svg', import.meta.url).href;
const Website = new URL('../assets/project/website.svg', import.meta.url).href;
const AI = new URL('../assets/project/ai.svg', import.meta.url).href;
const Healthcare = new URL('../assets/project/healthcare.svg', import.meta.url).href;
const Finance = new URL('../assets/project/finance.svg', import.meta.url).href;
const DataAnalytics = new URL('../assets/project/data-analytics.svg', import.meta.url).href;
const Other = new URL('../assets/project/other.svg', import.meta.url).href;
const Concept = new URL('../assets/project/concept.svg', import.meta.url).href;
const Planning = new URL('../assets/project/planning.svg', import.meta.url).href;
const Imminent = new URL('../assets/project/imminent.svg', import.meta.url).href;
const Execution = new URL('../assets/project/execution.svg', import.meta.url).href;


const images = {
  'branding': Branding,
  'mobile-app': MobileApp,
  'ux-audit': UXAudit,
  'web-app': WebApp,
  'website': Website,
  'ai': AI,
  'healthcare': Healthcare,
  'finance': Finance,
  'data-analytics': DataAnalytics,
  'other': Other,
  'concept': Concept,
  'planning': Planning,
  'imminent': Imminent,
  'execution': Execution
};

interface CardProps {
  values: CardDetails[];
  currentValues: Array<string>;
  handleUpdateValues: (categoryName: string) => void;
}

const CardCheckBox = ({
  values,
  currentValues,
  handleUpdateValues
}: CardProps) => {
  const isProjectSelected = (projectName: string) =>
    currentValues?.includes(projectName);

  const styleForSelectedProject = (projectName: string) =>
    isProjectSelected(projectName)
      ? {
          opacity: '100%'
        }
      : {};

  const styleForSelectedCard = (projectName: string) =>
    isProjectSelected(projectName)
      ? {
          border: '2px solid #6B76D0',
          opacity: '100%'
        }
      : {};

  const selectedIcon = (projectName: string) =>
    isProjectSelected(projectName) && (
      <img
        src={SelectedSVG}
        className="project-selected"
        style={{
          opacity: '100%'
        }}
      />
    );

  console.log(values, '...values');

  const AllCards = values.map(({ name, imageUrl }: CardDetails, index) => (
    <div
      className="card"
      key={index}
      style={styleForSelectedCard(name)}
      onClick={() => handleUpdateValues(name)}
    >
      {selectedIcon(name)}
      <img
        className="card-logo"
        src={(images as any)[imageUrl]}
        style={styleForSelectedProject(name)}
      />
      <span
        className="card-title"
        style={styleForSelectedProject(name)}
      >
        {name}
      </span>
    </div>
  ));

  return AllCards;
};

export default CardCheckBox;

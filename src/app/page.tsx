type Props = {
  title: string;
};

const Component = ({ title }: Props) => {
  return (
    <div>
      <h2>Component {title}</h2>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <h2>Rocketseat</h2>

      <Component title={222} />
    </div>
  );
}

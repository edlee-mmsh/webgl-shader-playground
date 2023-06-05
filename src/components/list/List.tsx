import styles from "./List.module.scss";

type ListProps = {
  data: Example[];
  onItemClick: (id: number) => void;
  activeId: number;
};

export default function List({ data, onItemClick, activeId }: ListProps) {
  return (
    <ul className={styles.list}>
      {data.map((example) => {
        const { name, id } = example;
        return (
          <li key={name}>
            <button
              onClick={() => onItemClick(id)}
              style={{ opacity: activeId === id ? 1 : 0.7 }}
            >
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

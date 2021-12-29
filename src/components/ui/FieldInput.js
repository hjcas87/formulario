


export const FieldInput = ({ indexParent, type, name, value, onChange, id }) => (
    
      <div>

        <input
          name={name}
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(indexParent, event)}
        />

      </div>
  );
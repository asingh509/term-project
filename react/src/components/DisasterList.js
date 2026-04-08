const DisasterList = ({ disasters }) => <ul>
    {disasters.map(d => <li key={d.id}>
        <strong>{d.title}</strong> — {d.location} ({d.severity})
    </li>)}
</ul>

export default DisasterList;
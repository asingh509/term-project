import { useState, useEffect } from 'react';
import DisasterList from './DisasterList.js';

const App = props => {

    const [disasters, setDisasters] = useState([]);
    const [status, setStatus] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        type_id: 1,
        severity: 'medium',
        reporter: '',
        org_type: 'Individual'
    });

    useEffect(function loadDisasters() {
        fetch('/api/v1/disasters')
        .then(res => res.json())
        .then(data => setDisasters(data.data));
    }, []);

    const submitDisaster = event => {
        event.preventDefault();
        setStatus('loading');
        fetch('/api/v1/disasters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error('something went wrong');
        })
        .then(response => {
            setDisasters([...disasters, response.data]);
            setStatus('success');
        })
        .catch(error => {
            console.log(error);
            setStatus('error');
        });
    }

    return <>
        <h1>DisasterWatch</h1>

        <DisasterList disasters={disasters} />

        {status === 'loading' && <p>Submitting...</p>}
        {status === 'success' && <p>Disaster reported!</p>}
        {status === 'error' && <p>Something went wrong.</p>}

        <form onSubmit={event => submitDisaster(event)}>
            <label>Title:
                <input type="text" value={formData.title}
                    onChange={event => setFormData({...formData, title: event.target.value})} />
            </label>
            <label>Location:
                <input type="text" value={formData.location}
                    onChange={event => setFormData({...formData, location: event.target.value})} />
            </label>
            <label>Severity:
                <select value={formData.severity}
                    onChange={event => setFormData({...formData, severity: event.target.value})}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
            </label>
            <label>Reporter:
                <input type="text" value={formData.reporter}
                    onChange={event => setFormData({...formData, reporter: event.target.value})} />
            </label>
            <label>Org Type:
                <select value={formData.org_type}
                    onChange={event => setFormData({...formData, org_type: event.target.value})}>
                    <option value="Individual">Individual</option>
                    <option value="NGO">NGO</option>
                    <option value="GO">GO</option>
                </select>
            </label>
            <button>Submit</button>
        </form>
    </>;
}

export default App;
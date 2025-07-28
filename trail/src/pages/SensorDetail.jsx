import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SensorDetail = () => {
    const { deviceId } = useParams();
    console.log("📟 Device ID from useParams:", deviceId);
    const [readings, setReadings] = useState([]);

    useEffect(() => {
    const fetchReadings = async () => {
        try {
            const res = await fetch(`http://localhost:2402/sensors/${deviceId}/data`);
            const data = await res.json();

            console.log("📦 Full response from backend:", data); // 👈 place this
            setReadings(data.readings);
        } catch (error) {
            console.error("❌ Failed to load readings:", error);
        }
    };

    fetchReadings();
}, [deviceId]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>📟 Sensor: <span style={{ color: '#007bff' }}>{deviceId}</span></h2>
            <h4>📊 Readings (latest first):</h4>

            {readings.length === 0 ? (
                <p>No readings available bro 🥲</p>
            ) : (
                readings.map((reading, index) => (
                    <div key={index} style={{
                        border: '1px solid #ddd',
                        borderRadius: '12px',
                        padding: '15px',
                        marginBottom: '12px',
                        background: '#f8f8f8',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        maxWidth: '420px'
                    }}>
                        <p><strong>🌡️ Temperature:</strong> {reading.data.temperature} °C</p>
                        <p><strong>💧 Humidity:</strong> {reading.data.humidity} %</p>
                        <p><strong>🏭 MQ135 Raw:</strong> {reading.data.mq135_raw}</p>
                        <p>🕒 Timestamp: {reading.timestamp ? new Date(reading.timestamp).toLocaleString() : 'N/A'}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default SensorDetail;

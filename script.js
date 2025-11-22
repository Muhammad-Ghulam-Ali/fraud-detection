// Navigation
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    animateStats();
    populateTransactionTable();
    populateAllTransactions();
    initCharts();
    startLiveFeed();
    initTestForm();
});

// Navigation System
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    const pageTitle = document.querySelector('.page-title');
    const breadcrumbCurrent = document.querySelector('.breadcrumb .current');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.add('hidden'));
            
            // Show selected page
            const pageId = item.dataset.page + '-page';
            const selectedPage = document.getElementById(pageId);
            if (selectedPage) {
                selectedPage.classList.remove('hidden');
            }
            
            // Update page title
            const pageName = item.querySelector('span').textContent;
            pageTitle.textContent = pageName;
            breadcrumbCurrent.textContent = pageName;
        });
    });
}

// Animate Statistics
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value [data-target]');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Sample Transaction Data
const sampleTransactions = [
    {
        id: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date(Date.now() - Math.random() * 3600000).toLocaleString(),
        amount: (Math.random() * 5000 + 100).toFixed(2),
        customer: 'Customer ' + Math.floor(Math.random() * 1000),
        location: ['New York', 'London', 'Tokyo', 'Dubai', 'Sydney'][Math.floor(Math.random() * 5)],
        riskScore: Math.floor(Math.random() * 30 + 70),
        status: ['Flagged', 'Pending'][Math.floor(Math.random() * 2)]
    }
];

// Generate more transactions
for (let i = 0; i < 20; i++) {
    sampleTransactions.push({
        id: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date(Date.now() - Math.random() * 86400000 * 7).toLocaleString(),
        amount: (Math.random() * 5000 + 50).toFixed(2),
        customer: 'Customer ' + Math.floor(Math.random() * 1000),
        location: ['New York', 'London', 'Tokyo', 'Dubai', 'Sydney', 'Paris', 'Berlin'][Math.floor(Math.random() * 7)],
        riskScore: Math.floor(Math.random() * 100),
        status: ['Flagged', 'Approved', 'Pending', 'Blocked'][Math.floor(Math.random() * 4)]
    });
}

// Populate High-Risk Transaction Table
function populateTransactionTable() {
    const tbody = document.querySelector('#transactionTable tbody');
    const highRiskTransactions = sampleTransactions.filter(t => t.riskScore >= 70).slice(0, 5);
    
    tbody.innerHTML = highRiskTransactions.map(transaction => {
        const riskClass = transaction.riskScore >= 80 ? 'high' : 
                         transaction.riskScore >= 50 ? 'medium' : 'low';
        const statusClass = transaction.status.toLowerCase();
        
        return `
            <tr>
                <td><strong>${transaction.id}</strong></td>
                <td>${transaction.date}</td>
                <td><strong>$${transaction.amount}</strong></td>
                <td>${transaction.customer}</td>
                <td>
                    <span class="risk-badge ${riskClass}">
                        <span class="dot"></span>
                        ${transaction.riskScore}% Risk
                    </span>
                </td>
                <td><span class="status-badge ${statusClass}">${transaction.status}</span></td>
                <td>
                    <button class="action-btn" onclick="viewTransaction('${transaction.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="flagTransaction('${transaction.id}')">
                        <i class="fas fa-flag"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Populate All Transactions
function populateAllTransactions() {
    const tbody = document.getElementById('allTransactionsTable');
    
    tbody.innerHTML = sampleTransactions.map(transaction => {
        const riskClass = transaction.riskScore >= 80 ? 'high' : 
                         transaction.riskScore >= 50 ? 'medium' : 'low';
        const statusClass = transaction.status.toLowerCase();
        
        return `
            <tr>
                <td><strong>${transaction.id}</strong></td>
                <td>${transaction.date}</td>
                <td><strong>$${transaction.amount}</strong></td>
                <td>${transaction.customer}</td>
                <td>${transaction.location}</td>
                <td>
                    <span class="risk-badge ${riskClass}">
                        <span class="dot"></span>
                        ${transaction.riskScore}%
                    </span>
                </td>
                <td><span class="status-badge ${statusClass}">${transaction.status}</span></td>
                <td>
                    <button class="action-btn" onclick="viewTransaction('${transaction.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="approveTransaction('${transaction.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Action Handlers
function viewTransaction(id) {
    alert(`Viewing transaction details for ${id}`);
}

function flagTransaction(id) {
    alert(`Transaction ${id} has been flagged for review`);
}

function approveTransaction(id) {
    alert(`Transaction ${id} has been approved`);
}

// Initialize Charts
function initCharts() {
    // Trend Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Total Transactions',
                        data: [2450, 2680, 2340, 2890, 2560, 2120, 2890],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#667eea',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    },
                    {
                        label: 'Fraud Detected',
                        data: [48, 52, 45, 58, 51, 42, 55],
                        borderColor: '#f56565',
                        backgroundColor: 'rgba(245, 101, 101, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#f56565',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: { 
                            color: '#a0aec0',
                            font: {
                                size: 12
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 39, 70, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#a0aec0',
                        borderColor: '#667eea',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true
                    }
                },
                scales: {
                    x: {
                        grid: { 
                            color: '#2d3748',
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#a0aec0',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: { 
                            color: '#2d3748',
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#a0aec0',
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Risk Distribution Chart
    const riskCtx = document.getElementById('riskChart');
    if (riskCtx) {
        new Chart(riskCtx, {
            type: 'doughnut',
            data: {
                labels: ['Low Risk', 'Medium Risk', 'High Risk'],
                datasets: [{
                    data: [14856, 649, 342],
                    backgroundColor: ['#48bb78', '#ed8936', '#f56565'],
                    borderWidth: 0,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { 
                            color: '#a0aec0',
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 39, 70, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#a0aec0',
                        borderColor: '#667eea',
                        borderWidth: 1,
                        padding: 12
                    }
                },
                cutout: '65%'
            }
        });
    }

    // Accuracy Chart
    const accuracyCtx = document.getElementById('accuracyChart');
    if (accuracyCtx) {
        new Chart(accuracyCtx, {
            type: 'bar',
            data: {
                labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score'],
                datasets: [{
                    label: 'Performance (%)',
                    data: [98.2, 97.6, 96.8, 97.2],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(72, 187, 120, 0.8)',
                        'rgba(79, 172, 254, 0.8)'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30, 39, 70, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#a0aec0',
                        borderColor: '#667eea',
                        borderWidth: 1,
                        padding: 12
                    }
                },
                scales: {
                    x: {
                        grid: { 
                            display: false,
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#a0aec0',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: { 
                            color: '#2d3748',
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#a0aec0',
                            font: {
                                size: 11
                            }
                        },
                        max: 100,
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Live Transaction Feed
function startLiveFeed() {
    const feedContainer = document.getElementById('liveFeed');
    
    function addFeedItem() {
        const transaction = {
            id: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            amount: (Math.random() * 2000 + 50).toFixed(2),
            time: new Date().toLocaleTimeString(),
            risk: Math.floor(Math.random() * 100)
        };
        
        const riskClass = transaction.risk >= 80 ? 'high' : 
                         transaction.risk >= 50 ? 'medium' : 'low';
        
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.innerHTML = `
            <div class="feed-info">
                <div class="feed-id">${transaction.id}</div>
                <div class="feed-amount">$${transaction.amount}</div>
            </div>
            <div>
                <span class="risk-badge ${riskClass}">
                    <span class="dot"></span>
                    ${transaction.risk}%
                </span>
            </div>
            <div class="feed-time">${transaction.time}</div>
        `;
        
        feedContainer.insertBefore(feedItem, feedContainer.firstChild);
        
        // Remove old items (keep last 10)
        while (feedContainer.children.length > 10) {
            feedContainer.removeChild(feedContainer.lastChild);
        }
    }
    
    // Add initial items
    for (let i = 0; i < 5; i++) {
        addFeedItem();
    }
    
    // Add new item every 5 seconds
    setInterval(addFeedItem, 5000);
}

// Test Form Handler
function initTestForm() {
    const form = document.getElementById('testForm');
    const resultCard = document.getElementById('testResult');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const amount = parseFloat(document.getElementById('testAmount').value);
        const age = parseInt(document.getElementById('testAge').value);
        const hour = parseInt(document.getElementById('testHour').value);
        const location = document.getElementById('testLocation').value;
        const device = document.getElementById('testDevice').value;
        const payment = document.getElementById('testPayment').value;
        
        // Calculate risk score (simplified algorithm)
        let riskScore = 0;
        
        // Amount factor
        if (amount > 3000) riskScore += 30;
        else if (amount > 1000) riskScore += 15;
        
        // Time factor
        if (hour >= 2 && hour <= 5) riskScore += 25;
        else if (hour >= 22 || hour <= 1) riskScore += 15;
        
        // Location factor
        if (location === 'high') riskScore += 20;
        else if (location === 'medium') riskScore += 10;
        
        // Payment factor
        if (payment === 'crypto') riskScore += 15;
        
        // Age factor
        if (age < 20 || age > 70) riskScore += 10;
        
        // Device factor
        if (device === 'mobile') riskScore += 5;
        
        // Cap at 100
        riskScore = Math.min(riskScore, 98);
        
        // Show result
        displayTestResult(riskScore, { amount, hour, location, payment, age });
    });
}

function displayTestResult(score, factors) {
    const resultCard = document.getElementById('testResult');
    const scoreValue = document.getElementById('scoreValue');
    const scoreFill = document.getElementById('scoreFill');
    const resultStatus = document.getElementById('resultStatus');
    const riskFactors = document.getElementById('riskFactors');
    
    // Show the result card
    resultCard.style.display = 'block';
    
    // Animate score
    let current = 0;
    const timer = setInterval(() => {
        current += 2;
        if (current >= score) {
            current = score;
            clearInterval(timer);
        }
        scoreValue.textContent = current;
        
        // Update circle
        const circumference = 283;
        const offset = circumference - (current / 100) * circumference;
        scoreFill.style.strokeDashoffset = offset;
    }, 20);
    
    // Update gradient color based on risk
    const gradient = document.getElementById('scoreGradient');
    if (gradient) {
        const stops = gradient.querySelectorAll('stop');
        if (score >= 70) {
            stops[0].setAttribute('style', 'stop-color:#f56565;stop-opacity:1');
            stops[1].setAttribute('style', 'stop-color:#c53030;stop-opacity:1');
        } else if (score >= 40) {
            stops[0].setAttribute('style', 'stop-color:#ed8936;stop-opacity:1');
            stops[1].setAttribute('style', 'stop-color:#c05621;stop-opacity:1');
        } else {
            stops[0].setAttribute('style', 'stop-color:#48bb78;stop-opacity:1');
            stops[1].setAttribute('style', 'stop-color:#38a169;stop-opacity:1');
        }
    }
    
    // Status
    const statusClass = score >= 70 ? 'high-risk' : score >= 40 ? 'medium-risk' : 'low-risk';
    const statusText = score >= 70 ? '⚠️ HIGH RISK - Transaction Flagged' : 
                      score >= 40 ? '⚡ MEDIUM RISK - Manual Review Recommended' : 
                                   '✅ LOW RISK - Transaction Approved';
    
    resultStatus.className = `result-status ${statusClass}`;
    resultStatus.textContent = statusText;
    
    // Risk factors
    const factorsList = [
        { name: 'Transaction Amount', impact: factors.amount > 3000 ? 'high' : factors.amount > 1000 ? 'medium' : 'low' },
        { name: 'Transaction Time', impact: (factors.hour >= 2 && factors.hour <= 5) ? 'high' : (factors.hour >= 22 || factors.hour <= 1) ? 'medium' : 'low' },
        { name: 'Location Risk', impact: factors.location },
        { name: 'Payment Method', impact: factors.payment === 'crypto' ? 'high' : 'low' },
        { name: 'Customer Age', impact: (factors.age < 20 || factors.age > 70) ? 'medium' : 'low' }
    ];
    
    riskFactors.innerHTML = factorsList.map(factor => `
        <div class="factor-item">
            <span class="factor-name">${factor.name}</span>
            <span class="factor-impact ${factor.impact}">${factor.impact.toUpperCase()}</span>
        </div>
    `).join('');
    
    // Scroll to result
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add some interactivity to stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('shimmer');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('shimmer');
    });
});
const resourceResultsDiv = document.getElementById('resourceResults');
const resourceSearchInput = document.getElementById('resourceSearch');

async function searchResourcesUI() {
  const query = resourceSearchInput.value;

  try {
    const res = await fetch(`http://localhost:5000/api/resources?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    renderResources(data.results);
  } catch (err) {
    console.error('Resource search failed', err);
    resourceResultsDiv.innerHTML = '<p>Failed to load resources.</p>';
  }
}

function renderResources(resources) {
  if (!resources || resources.length === 0) {
    resourceResultsDiv.innerHTML = '<p>No resources found.</p>';
    return;
  }

  let html = '';
  resources.forEach(r => {
    html += `
      <div class="resource-card">
        <h4>${r.title}</h4>
        <p>${r.description || ''}</p>
        <p><strong>Category:</strong> ${r.category}</p>
        <p><strong>Source:</strong> ${r.source || '—'}</p>
        <p><strong>Evidence:</strong> ${r.evidenceLevel}</p>
      </div>
    `;
  });

  resourceResultsDiv.innerHTML = html;
}

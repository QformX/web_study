// Структура данных организации
const organization = {
    name: "Компания",
    children: [
        {
            name: "Отдел разработки",
            children: [
                { name: "Иванов Иван Иванович", position: "Разработчик" },
                { name: "Петрова Анна Сергеевна", position: "Тестировщик" }
            ]
        },
        {
            name: "Отдел продаж",
            children: [
                { name: "Сидоров Петр Алексеевич", position: "Менеджер по продажам" },
                { name: "Козлова Елена Дмитриевна", position: "Менеджер по работе с клиентами" }
            ]
        }
    ]
};

// Функция для поиска узла по имени
function findNodeByName(node, name) {
    if (node.name === name) {
        return node;
    }
    if (node.children) {
        for (let child of node.children) {
            const found = findNodeByName(child, name);
            if (found) return found;
        }
    }
    return null;
}

// Функция для получения пути к узлу
function getPathToNode(node, name, path = []) {
    if (node.name === name) {
        return path;
    }
    if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
            const newPath = getPathToNode(node.children[i], name, [...path, i]);
            if (newPath) return newPath;
        }
    }
    return null;
}

// Функция для разворачивания дерева до нужного узла
function expandToNode(name) {
    const path = getPathToNode(organization, name);
    if (!path) return;

    let currentNode = document.getElementById('tree').firstChild;
    for (let i of path) {
        if (currentNode) {
            const childrenContainer = currentNode.querySelector('div');
            if (childrenContainer) {
                childrenContainer.style.display = 'block';
                currentNode = childrenContainer.children[i];
            }
        }
    }
}

// Функция для выбора сотрудника
function selectEmployee(name) {
    const allNodes = document.querySelectorAll('.tree-node span');
    allNodes.forEach(node => node.classList.remove('selected'));

    expandToNode(name);

    const selectedNode = document.querySelector(`.tree-node span[data-name="${name}"]`);
    if (selectedNode) {
        selectedNode.classList.add('selected');
        selectedNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Функция для отрисовки дерева
function renderTree(node, parentElement) {
    const nodeElement = document.createElement('div');
    nodeElement.className = 'tree-node';
    
    const span = document.createElement('span');
    span.textContent = node.name;
    span.setAttribute('data-name', node.name);
    span.onclick = () => toggleNode(nodeElement);
    nodeElement.appendChild(span);

    if (node.children) {
        const childrenContainer = document.createElement('div');
        childrenContainer.style.display = 'none';
        node.children.forEach(child => renderTree(child, childrenContainer));
        nodeElement.appendChild(childrenContainer);
    }

    parentElement.appendChild(nodeElement);
}

// Функция для сворачивания/разворачивания узлов
function toggleNode(nodeElement) {
    const childrenContainer = nodeElement.querySelector('div');
    if (childrenContainer) {
        childrenContainer.style.display = childrenContainer.style.display === 'none' ? 'block' : 'none';
    }
}

// Функция поиска сотрудников
function searchEmployees(query) {
    const results = [];
    function search(node) {
        if (node.name.toLowerCase().includes(query.toLowerCase())) {
            results.push(node);
        }
        if (node.children) {
            node.children.forEach(search);
        }
    }
    search(organization);
    return results;
}

// Функция для отображения результатов поиска
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = result.name;
        div.onclick = () => selectEmployee(result.name);
        searchResults.appendChild(div);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('tree');
    renderTree(organization, treeContainer);

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const results = searchEmployees(query);
        displaySearchResults(results);
    });
});

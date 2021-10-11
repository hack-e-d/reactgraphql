const RepoInfo = ({ repo }) => {

    let license;

    switch (repo.licenseInfo?.spdxId) {
        case undefined :
            license = (
                <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger" style= { { fontSize: ".7rem " } }>
                    NO LICENSE
                </span>
            );
            break;

        case "NOASSERTION" :
            license = (
                <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning" style= { { fontSize: ".7rem " } }>
                    { repo.licenseInfo?.spdxId.toString().toUpperCase() }
                </span>
            );
            break;

        default :
            license = (
                <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-success" style= { { fontSize: ".7rem " } }>
                    { repo.licenseInfo.spdxId.toString().toUpperCase() }
                </span>
            );
            break;
    }
    return (
        <li className="list-group-item" key={repo.id.toString()}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <a className="h5 mb-0 text-decoration-none" href={repo.url} target="_blank">
                        {repo.name}
                    </a>
                    <p className="small">
                        {repo.description}
                    </p>
                </div>
                <div className=" text-nowrap ms-3">
                    { license }
                    <span className={
                        "px-1 py-1 ms-1 d-inline-block btn btn-sm " +
                        (repo.viewerSubscription === "SUBSCRIBED" ?
                            "btn-success" : "btn-secondary")
                    } style={{ fontSize: '0.7rem' }}>
                        {repo.viewerSubscription}
                    </span>
                </div>
            </div>
        </li>
    )
};

export default RepoInfo;
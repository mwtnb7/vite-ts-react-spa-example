import React from "react";
import { PropertyData } from "../types/types";

interface PropertyCardProps {
	property: PropertyData;
	onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
	return (
		<div
			className="c-forms__select-property-selected is-card"
			onClick={onClick}>
			<div className="c-forms__propety">
				<div className="c-forms__propety-image">
					<img
						src={property.featured_image_url}
						alt={property.title.rendered}
					/>
				</div>
				<div className="c-forms__propety-content">
					<div className="c-forms__propety-title">{property.title.rendered}</div>
					<div className="c-forms__propety-labels">
						{property.feature_labels &&
							Object.entries(property.feature_labels).map(([label, className], index) => (
								<span
									key={index}
									className={`c-label ${className}`}>
									{label}
								</span>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;

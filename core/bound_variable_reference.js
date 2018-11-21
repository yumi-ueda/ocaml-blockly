/**
 * @fileoverview The class handling a reference to variable declared in blocks.
 * This class is expected to be used in a typedVersion workspace.
 */
'use strict';

goog.provide('Blockly.BoundVariableValueReference');

goog.require('Blockly.BoundVariableAbstract');
goog.require('goog.string');


/**
 * Class for a reference to variable defined in block.
 * @param {!Blockly.Block} block This reference's block.
 * @param {!string} fieldName The name of the field that contains this
 *     variable.
 * @param {!Blockly.TypeExpr} typeExpr The type expression of the variable.
 * @param {!string} varName The default name of this reference.
 * @constructor
 */
Blockly.BoundVariableValueReference = function(block, fieldName, typeExpr,
    varName) {
  /**
   * The variable this reference refers to, or null if it's not been resolved
   * yet.
   * @type {Blockly.BoundVariableValue}
   * @private
   */
  this.value_ = null;

  /**
   * Temporary display name while this reference is not resolved. Otherwise the
   * variable's name is used as display name instead. These two names are
   * required to be identical just when the reference is resolved.
   * @type {string}
   */
  this.temporayDisplayName_ = varName;

  Blockly.BoundVariableValueReference.superClass_.constructor.call(this,
      block, fieldName, typeExpr);

  Blockly.BoundVariables.addReference(this.workspace_, this);
};
goog.inherits(Blockly.BoundVariableValueReference, Blockly.BoundVariableAbstract);

/**
 * Wether this variable is a reference to a variable value.
 * @return {boolean} True if this variable is a reference.
 */
Blockly.BoundVariableValueReference.prototype.isReference = function() {
  return true;
};

/**
 * Gets the variable name for this reference. Returns that of the value if the
 * value has been resolved.
 * @return {string} The display name.
 * @override
 */
Blockly.BoundVariableValueReference.prototype.getVariableName = function() {
  return this.value_ ? this.value_.getVariableName() : this.temporayDisplayName_;
};

/**
 * Set the variable name for this variable.
 * @param {!string} newName The new name for this variable.
 * @override
 */
Blockly.BoundVariableValueReference.prototype.setVariableName = function(newName) {
  if (this.value_ && this.value_.getVariableName() !== newName) {
    this.value_.setVariableName(newName);
  }
  // Update the text only if the new name is different from the displayed one.
  if (this.temporayDisplayName_ !== newName) {
    // Save the new displayed name.
    this.temporayDisplayName_ = newName;
    this.referenceChange_();
  }
};

/**
 * Returns a list of variables which refer to the same value, or are referred
 * to by them.  Includes this variable in the list.
 * @return {Array.<!Blockly.BoundVariableAbstract>} A list of variables.
 * @override
 */
Blockly.BoundVariableValueReference.prototype.getAllBoundVariables = function() {
  if (this.value_) {
    return this.value_.getAllBoundVariables();
  } else {
    return [this];
  }
};

/**
 * Gets whether this reference is cyclic. A reference is cyclic if it refers to
 * a value existing in the same block subtree.
 * @param {Blockly.Block=} opt_block The root of block subtree. If provided,
 *     detect if the reference is cyclic on the given block or its nested
 *     blocks. Defaults to the root block of the reference's block.
 * @return {boolean} True if cyclic.
 */
Blockly.BoundVariableValueReference.prototype.isCyclicReference = function(
    opt_block) {
  if (this.value_) {
    var rootBlock = opt_block ? opt_block : this.sourceBlock_.getRootBlock();
    var valueBlock = this.value_.getSourceBlock();
    while (valueBlock) {
      if (valueBlock == rootBlock) {
        return true;
      }
      valueBlock = valueBlock.getParent();
    }
  }
  return false;
};

/**
 * Gets the value this reference refers to.
 * @return {!Blockly.BoundVariableValue} The bound value, or null.
 */
Blockly.BoundVariableValueReference.prototype.getBoundValue = function() {
  return this.value_;
};

/**
 * Sets the value to refer to. Throw an exception if the bound value is already
 * resolved.
 * @param {!Blockly.BoundVariableValue} value The variable to refer to.
 */
Blockly.BoundVariableValueReference.prototype.setBoundValue = function(value) {
  if (this.value_) {
    if (this.value_ == value) {
      return;
    } else {
      throw 'The bound value has already been resolved.';
    }
  }
  if (value.getVariableName() !== this.temporayDisplayName_) {
    throw 'Names are not identical.';
  }
  this.value_ = value;
  value.storeReference(this);
  this.value_.getTypeExpr().unify(this.typeExpr_);

  this.referenceChange_();
};

/**
 * Remove the reference to the current value.
 */
Blockly.BoundVariableValueReference.prototype.removeBoundValue = function() {
  if (this.value_) {
    this.value_.removeReference(this);
    this.value_.getTypeExpr().disconnect(this.value_.typeExpr_);
    this.value_ = null;
  }
};

/**
 * Update the source block when this reference is changed.
 * @private
 */
Blockly.BoundVariableValueReference.prototype.referenceChange_ = function() {
  this.getContainerField().updateText();
};

/**
 * Dispose of this reference.
 */
Blockly.BoundVariableValueReference.prototype.dispose = function() {
  Blockly.BoundVariables.removeReference(this.workspace_, this);
  Blockly.BoundVariableValueReference.superClass_.dispose.call(this);
  if (this.value_) {
    this.value_.removeReference(this);
    this.value_ = null;
  }
};
/**
 * @fileoverview Mutator blocks to handle parameters, and inputs.
 * Used by typed blocks.
 * @author harukam0416@gmail.com (Haruka Matsumoto)
 */
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['item_template'] = {
  init: function(str) {
    this.setColour(Blockly.Msg['MUTATOR_HUE']);
    this.appendDummyInput()
        .appendField(str);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};

Blockly.Blocks['container_template'] = {
  init: function(str, optStr) {
    this.setColour(Blockly.Msg['MUTATOR_HUE']);
    this.appendDummyInput()
        .appendField(str);
    this.appendStatementInput('STACK');
    if (optStr) {
      this.appendDummyInput()
          .appendField(optStr);
    }
    this.contextMenu = false;
  },

  /**
   * Returns how many blocks exist in this container.
   * @return {number} Number of blocks this container holds.
   */
  getItemCount: function() {
    var itemBlock = this.getInputTargetBlock('STACK');
    var itemCount = 0;
    while (itemBlock) {
      itemCount++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    return itemCount;
  },

  /**
   * Append the block at the tail of statement connection.
   * @param {!Blockly.Block} block The block to be connected to this block.
   */
  append: function(block) {
    var connection = this.getInput('STACK').connection;
    connection.connect(block.previousConnection);
  }
};

Blockly.Blocks['parameters_arg_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['parameters_arg_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, 'parameter');
};

Blockly.Blocks['parameters_arg_container'] =
  Object.assign({}, Blockly.Blocks['container_template']);
Blockly.Blocks['parameters_arg_container'].init = function() {
  Blockly.Blocks['container_template'].init.call(this, 'parameters');
};

Blockly.Blocks['constructor_variant_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['constructor_variant_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, 'constructor');
};

Blockly.Blocks['constructor_variant_container'] =
  Object.assign({}, Blockly.Blocks['container_template']);
Blockly.Blocks['constructor_variant_container'].init = function() {
  Blockly.Blocks['container_template'].init.call(this, 'variant');
};

Blockly.Blocks['match_pattern_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['match_pattern_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, 'pattern');
};

Blockly.Blocks['match_pattern_container'] =
  Object.assign({}, Blockly.Blocks['container_template']);
Blockly.Blocks['match_pattern_container'].init = function() {
  Blockly.Blocks['container_template'].init.call(this, 'match');
};

Blockly.Blocks['record_field_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['record_field_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, 'field');
};

Blockly.Blocks['record_field_container'] =
  Object.assign({}, Blockly.Blocks['container_template']);
Blockly.Blocks['record_field_container'].init = function() {
  Blockly.Blocks['container_template'].init.call(this, 'record fields');
};

Blockly.Blocks['world_name_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_name_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~name');
};

Blockly.Blocks['world_width_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_width_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~width');
};

Blockly.Blocks['world_height_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_height_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~height');
};

Blockly.Blocks['world_draw_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_draw_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~to_draw');
};

Blockly.Blocks['world_keypress_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_keypress_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~on_key_press');
};

Blockly.Blocks['world_tick_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_tick_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~on_tick');
};

Blockly.Blocks['world_rate_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_rate_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~rate');
};

Blockly.Blocks['world_stop_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_stop_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~stop_when');
};

Blockly.Blocks['world_drawlast_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_drawlast_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~to_draw_last');
};

Blockly.Blocks['world_mouse_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_mouse_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~on_mouse');
};

Blockly.Blocks['world_keyrelease_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['world_keyrelease_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, '~on_key_release');
};

Blockly.Blocks['create_world_container'] =
  Object.assign({}, Blockly.Blocks['container_template']);
Blockly.Blocks['create_world_container'].init = function() {
  Blockly.Blocks['container_template'].init.call(this, 'big_bang');
};

Blockly.Blocks['else_if_then_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['else_if_then_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, 'else if then');
};

Blockly.Blocks['if_then_else_container'] =
  Object.assign({}, Blockly.Blocks['container_template']);
Blockly.Blocks['if_then_else_container'].init = function() {
  Blockly.Blocks['container_template'].init.call(this, 'if then', 'else');
};

Blockly.Blocks['operand_item'] =
  Object.assign({}, Blockly.Blocks['item_template']);
Blockly.Blocks['operand_item'].init = function() {
  Blockly.Blocks['item_template'].init.call(this, 'operand');
};

Blockly.Blocks['operand_container'] =
  Object.assign({}, Blockly.Blocks['container_template']);
Blockly.Blocks['operand_container'].init = function() {
  Blockly.Blocks['container_template'].init.call(this, 'operands');
};
